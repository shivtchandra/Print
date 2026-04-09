'use client';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { clientStorage } from '@/lib/firebase/client';

interface ImageUploadProps {
  onUploadComplete: (urls: string[]) => void;
  folder?: string;
  allowMultiple?: boolean;
  maxFiles?: number;
  initialUrls?: string[];
}

export function ImageUpload({
  onUploadComplete,
  folder = 'general',
  allowMultiple = false,
  maxFiles = 5,
  initialUrls = []
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>(initialUrls);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync internal previews when initialUrls prop changes (e.g. switching between products being edited)
  useEffect(() => {
    setPreviews(initialUrls);
  }, [JSON.stringify(initialUrls)]);


  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (!clientStorage) {
      setError('Firebase Storage is not initialized.');
      return;
    }

    const fileList = Array.from(files);
    if (!allowMultiple && fileList.length > 1) {
      setError('Only one file is allowed.');
      return;
    }

    if (allowMultiple && previews.length + fileList.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      // Parallel uploads for better performance and reliability
      const uploadPromises = fileList.map(async (file) => {
        if (!clientStorage) throw new Error('Storage not initialized');
        
        // Add a random string to ensure uniqueness even if Date.now() is the same
        const randomString = Math.random().toString(36).substring(2, 8);
        const fileName = `${Date.now()}_${randomString}_${file.name.replace(/\s+/g, '_')}`;
        const storageRef = ref(clientStorage, `${folder}/${fileName}`);
        
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Note: Individual progress is hard to aggregate perfectly in parallel, 
              // but we can at least show that activity is happening.
              const currentProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // Just update with latest progress from any file to show activity
              setProgress(currentProgress);
            },
            (err) => reject(err),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      const allUrls = allowMultiple ? [...previews, ...uploadedUrls] : [uploadedUrls[0]];
      setPreviews(allUrls);
      onUploadComplete(allUrls);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Upload failed. Please ensure your Firebase Storage Rules are set to "allow write: if true;" for testing.');
    } finally {
      setUploading(false);
      setProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const next = previews.filter((_, i) => i !== index);
    setPreviews(next);
    onUploadComplete(next);
  };

  return (
    <div className="image-upload-wrapper">
      <div className="image-previews">
        {previews.map((url, idx) => (
          <div key={idx} className="preview-item">
            <img src={url} alt={`Preview ${idx}`} />
            <button type="button" className="remove-btn" onClick={() => removeImage(idx)}>
              ×
            </button>
          </div>
        ))}
        {(!allowMultiple && previews.length === 0) || (allowMultiple && previews.length < maxFiles) ? (
          <div
            className={`upload-dropzone ${uploading ? 'uploading' : ''}`}
            onClick={() => !uploading && fileInputRef.current?.click()}
          >
            {uploading ? (
              <div className="upload-progress">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                <span>{Math.round(progress)}%</span>
              </div>
            ) : (
              <div className="upload-placeholder">
                <span className="plus-icon">+</span>
                <span className="text">Click to Upload</span>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        multiple={allowMultiple}
        style={{ display: 'none' }}
      />
      {error && <p className="upload-error">{error}</p>}
    </div>
  );
}
