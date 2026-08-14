import { useEffect, useState } from "react";
import { termsSections, TERMS_VERSION, TERMS_UPDATED } from "../data/terms";
import { resortInfo } from "../data/resortInfo";
import "../style/terms.css";

const STORAGE_KEY = "nsr_terms_accepted";

export const hasAcceptedTerms = () =>
  localStorage.getItem(STORAGE_KEY) === TERMS_VERSION;

// Shown once per visitor (and again whenever TERMS_VERSION changes).
export default function TermsGate() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!hasAcceptedTerms()) setOpen(true);

    const reopen = () => {
      setChecked(false);
      setOpen(true);
    };
    window.addEventListener("nsr:open-terms", reopen);
    return () => window.removeEventListener("nsr:open-terms", reopen);
  }, []);

  // No scrolling behind the dialog while it is blocking the site
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("terms-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("terms-open");
    };
  }, [open]);

  if (!open) return null;

  const accepted = hasAcceptedTerms();

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, TERMS_VERSION);
    setOpen(false);
  };

  return (
    <div className="terms-overlay" role="dialog" aria-modal="true" aria-labelledby="terms-title">
      <div className="terms-modal">
        <header className="terms-head">
          <h2 id="terms-title">Terms &amp; Conditions</h2>
          <p>
            Please read and accept before continuing · Version {TERMS_VERSION} ·
            Updated {TERMS_UPDATED}
          </p>
        </header>

        <div className="terms-body">
          <p className="terms-intro">
            Welcome to {resortInfo.name}. By using this website and booking a stay
            with us, you agree to the following terms.
          </p>

          {termsSections.map((section) => (
            <section key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </section>
          ))}

          <p className="terms-contact">
            Questions about these terms? Call{" "}
            <a href={resortInfo.contact.phoneHref}>{resortInfo.contact.phone}</a> or email{" "}
            <a href={resortInfo.contact.emailHref}>{resortInfo.contact.email}</a>.
          </p>
        </div>

        <footer className="terms-foot">
          {accepted ? (
            <button className="terms-accept" onClick={() => setOpen(false)}>
              Close
            </button>
          ) : (
            <>
              <label className="terms-check">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <span>I have read and agree to the Terms &amp; Conditions</span>
              </label>

              <button className="terms-accept" disabled={!checked} onClick={accept}>
                Agree &amp; Continue
              </button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}
