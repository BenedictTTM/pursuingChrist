"use client";

export default function Contact() {
    return (
        <section id="contact" className="relative min-h-[50vh] flex flex-col items-center justify-center bg-transparent overflow-hidden ">

            <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
                {/* Header */}
                <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-display font-extrabold text-[var(--color-mba-text-primary)] mb-6 uppercase tracking-tight">
                        Get in Touch
                    </h2>
                    <div className="w-24 h-0.5 bg-[var(--color-mba-gold)] mx-auto mb-8" />
                    <p className="text-xl md:text-2xl text-[var(--color-mba-text-grey)] font-[family-name:var(--font-playfair)] italic font-light leading-relaxed">
                        "Available for academic collaboration, speaking engagements, and consultation."
                    </p>
                </div>

                {/* Email Display */}
                <div className="flex flex-col items-center justify-center space-y-12 w-full">
                    <div className="text-center w-full group">
                        <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-mba-text-grey)] mb-6">
                            Direct Email
                        </h3>
                        <a
                            href="mailto:jeffrey.drai@yorku.ca"
                            className="relative inline-block text-3xl md:text-5xl lg:text-6xl font-display font-extrabold text-[var(--color-mba-text-primary)] tracking-tight hover:text-[var(--color-mba-gold)] transition-colors duration-500"
                        >
                            jeffrey.drai@yorku.ca
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[var(--color-mba-gold)] transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
                        </a>
                    </div>
                </div>

                {/* Social/Location or Extra Info could go here */}
            </div>
        </section>
    );
}
