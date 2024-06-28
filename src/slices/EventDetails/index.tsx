import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `EventDetails`.
 */
export type EventDetailsProps = SliceComponentProps<Content.EventDetailsSlice>;

/**
 * Component for "EventDetails" Slices.
 */
const EventDetails = async ({
  slice,
}: EventDetailsProps): Promise<JSX.Element> => {
  const client = createClient();

  const eventDetails = await Promise.all(
    slice.primary.info.map(async (item) => {
      if (isFilled.contentRelationship(item.eventdetails)) {
        return await client.getByID<Content.EventDetailsDocument>(
          item.eventdetails.id,
        );
      }
    }),
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
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
      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mt-20 grid gap-16">
        {eventDetails.map(
          (eventDetail, index) =>
            eventDetail && (
              <div
                className="relative grid gap-4 rounded-xl opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
                key={eventDetail.id}
              >
                <div className="col-span-1 flex flex-col justify-center gap-4">
                  <h3 className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text text-4xl not-italic text-transparent">
                    <PrismicText field={eventDetail.data.title} />
                  </h3>

                  <div className="max-w-md">
                    <PrismicRichText field={eventDetail.data.description} />
                  </div>
                  <ButtonLink
                    document={eventDetail}
                    className="after:absolute after:inset-0 hover:underline"
                  >
                    Read More About{" "}
                    <PrismicText field={eventDetail.data.title} />
                  </ButtonLink>
                </div>
                <PrismicNextImage
                  field={eventDetail.data.image}
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={clsx(
                    "rounded-xl lg:col-span-2",
                    index % 2 && "md:-order-1",
                  )}
                />
              </div>
            ),
        )}
      </div>
    </Bounded>
  );
};

export default EventDetails;
