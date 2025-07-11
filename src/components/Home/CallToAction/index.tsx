import Image from "next/image";
import Link from "next/link";
const CallToAction = () => {
  return (
    <section className="relative z-1 overflow-hidden bg-primary py-17.5 lg:py-22.5 xl:py-25">
      <div className="mx-auto w-full max-w-[585px] px-4 text-center sm:px-8 xl:px-0">
        <h2 className="mb-5 font-satoshi text-3xl font-bold -tracking-[1.6px] text-white lg:text-heading-4 xl:text-heading-2">
          Ready to Get Started?
        </h2>

        <p className="text-gray-2">
          Sign up for free and start deploying applications in seconds
        </p>

        <div className="mt-7.5 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/templates"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 font-satoshi font-medium -tracking-[0.2px] text-black hover:bg-opacity-90 transition-colors duration-200"
          >
            See App Template
          </Link>
          
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-full border-2 border-white px-7 py-3 font-satoshi font-medium -tracking-[0.2px] text-white hover:bg-white hover:text-primary transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* <!-- bg shapes --> */}
      <div className="hidden sm:block">
        <div className="absolute bottom-0 left-0 -z-1">
          <Image
            src="/images/cta/cta-grid-01.svg"
            alt="grid"
            width={376}
            height={376}
          />
        </div>
        <div className="absolute right-0 top-0 -z-1">
          <Image
            src="/images/cta/cta-grid-02.svg"
            alt="grid"
            width={376}
            height={376}
          />
        </div>
        <div className="absolute bottom-0 left-0 -z-1">
          <Image
            src="/images/cta/cta-shape-01.svg"
            alt="grid"
            width={1010}
            height={404}
          />
        </div>
        <div className="absolute bottom-0 right-0 -z-1">
          <Image
            src="/images/cta/cta-shape-02.svg"
            alt="grid"
            width={935}
            height={404}
          />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
