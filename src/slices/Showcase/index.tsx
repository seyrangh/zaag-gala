import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { PiGraduationCapFill, PiTicketFill } from "react-icons/pi";
import AnimatedContent from "./AnimatedContent";

const icons = {
  graduationCap: <PiGraduationCapFill />,
  ticket: <PiTicketFill />,
};

/**
 * Props for `Showcase`.
 */
export type ShowcaseProps = SliceComponentProps<Content.ShowcaseSlice>;

/**
 * Component for "Showcase" Slices.
 */
const Showcase = ({ slice }: ShowcaseProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/20 blur-3xl filter" />

      <AnimatedContent>
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-balance text-center text-5xl font-medium md:text-7xl">
                {children}
              </h2>
            ),
            em: ({ children }) => (
              <em className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text not-italic text-transparent">
                {children}
              </em>
            ),
          }}
        />
      </AnimatedContent>
      {slice.primary.reverseorder.map((item, index) => (
        <div
          key={index}
          className="mt-16 grid items-center rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:py-12"
        >
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-fit rounded-lg bg-blue-500/35 p-4 text-3xl">
              {item.icon && icons[item.icon as keyof typeof icons]}
            </div>
            <div className="mt-6 bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-center text-2xl font-normal not-italic text-transparent lg:text-left">
              <PrismicRichText field={item.subheading} />
            </div>
            <div className="prose prose-invert mt-4 max-w-xl text-center lg:text-left">
              <PrismicRichText field={item.body} />
            </div>
            <ButtonLink field={item.button_link} className="mt-6">
              {item.button_text || "Learn More About Zaag"}
            </ButtonLink>
          </div>
          <PrismicNextImage
            field={item.image}
            className={clsx(
              "rounded-xl opacity-90 shadow-2xl lg:col-span-2 lg:pt-0",
              item.icon === "graduationCap"
                ? "lg:-order-1 lg:translate-x-[-15%]"
                : "lg:order-1 lg:translate-x-[15%]",
            )}
          />
        </div>
      ))}
    </Bounded>
  );
};

export default Showcase;
