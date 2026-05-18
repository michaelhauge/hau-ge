export function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted">
              About
            </p>
            <h2 className="text-balance">A practitioner, not a pundit.</h2>
          </div>

          <div className="space-y-6 text-base text-muted md:col-span-7 md:col-start-6">
            <p>
              I am Michael Hauge. I run{" "}
              <a
                href="https://pertamagroup.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Pertama Group
              </a>
              , a founder-led platform at the intersection of AI, education,
              and capital. Four entities do the work:{" "}
              <a
                href="https://pertamapartners.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Pertama Partners
              </a>{" "}
              (AI training and advisory),{" "}
              <a
                href="https://pertamacapital.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Pertama Capital
              </a>{" "}
              (patient capital for family businesses and private investments),{" "}
              <a
                href="https://pertamaventures.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Pertama Ventures
              </a>{" "}
              (early-stage backing for AI-native founders), and{" "}
              <a
                href="https://learningleaders.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                LearningLeaders
              </a>{" "}
              (youth communication and leadership development).
            </p>
            <p>
              The reason for four entities: training generates the operator
              insight, capital backs the operators who put it to work, and
              every leg sharpens the others. It compounds because it&rsquo;s
              the same conviction expressed three different ways.
            </p>
            <p>
              Most AI work I see falls into two camps: pundits who talk about
              the future, and engineers who ship features. I sit in a third
              place: a practitioner who runs the workflows, designs the
              curriculum, ships the implementation, and writes the check when
              an operator is worth backing.
            </p>
            <p>
              I have a particular interest in family businesses. I come out of
              a fourth-generation U.S. family business myself, and through
              Pertama Capital I back family-owned enterprises in Malaysia and
              Singapore — growth capital and operational modernization for
              businesses that already have durable demand and want to
              professionalize without losing what made them work. I&rsquo;m
              based in Kuala Lumpur after twelve years operating in China and
              three in Malaysia &mdash; training and conversations available
              in English or Mandarin depending on the audience. On the
              venture side, fifteen years of backing exceptional founders has
              produced a portfolio of 100+ investments across six continents
              (Stripe, Patreon, Eight Sleep, Wonderschool, and others —{" "}
              <a
                href="https://pertamaventures.com/portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                full portfolio
              </a>
              ).
            </p>
            <p>
              The constant across training, capital, and ventures: real
              practitioner depth, an artifact-first approach, and a refusal to
              hand-wave at the things that matter.
            </p>
            <p>
              Depending on the engagement, I&rsquo;ll work with you personally,
              or through Pertama Partners if tapping into our partner network
              is a better fit. Either way, you get the network that comes with
              the work: trusted lawyers and tax advisors for deal structures,
              executive search for the seat I can&rsquo;t fill, fellow CEOs
              and family-business operators to compare notes with, and the
              Pertama Ventures portfolio when the right intro speeds things
              up.
            </p>
            <p>
              One thing worth saying out loud: training engagements never
              trigger investment outreach unless you ask. The legs reinforce
              each other intellectually, not commercially.
            </p>

            <div className="mt-8 border-t border-border pt-8">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
                Credentials &amp; affiliations
              </p>
              <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted">Education</dt>
                  <dd className="mt-0.5 text-foreground">
                    Deerfield Academy (Alumni Award recipient) · [TO CONFIRM
                    — university]
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Languages</dt>
                  <dd className="mt-0.5 text-foreground">
                    English (native) · Mandarin (working professional)
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Based</dt>
                  <dd className="mt-0.5 text-foreground">
                    Kuala Lumpur, Malaysia
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Memberships</dt>
                  <dd className="mt-0.5 text-foreground">
                    Entrepreneurs&rsquo; Organization · [TO CONFIRM &mdash;
                    YPO, Pacific Council, others]
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-muted">
                A fuller bio is available on request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
