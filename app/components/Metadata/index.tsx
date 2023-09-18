import { FC } from "react";

type MetadataProps = {
  title?: string;
};

const Metadata: FC<MetadataProps> = ({ title }) => {
  return (
    <>
      <title>{[title, "CS2LOGS"].filter(Boolean).join(" ")}</title>
    </>
  );
};

export default Metadata;
