import Link from 'next/link';

interface InlineCTAProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref?: string;
}

export function InlineCTA({ title, subtitle, buttonText, buttonHref = '#enquiry' }: InlineCTAProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="inline-cta">
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <Link href={buttonHref} className="primary-btn">
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
