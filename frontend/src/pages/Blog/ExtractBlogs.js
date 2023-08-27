// BlogContentExtractor.js

import React from "react";

import {
  extractFirstParagraph,
  extractFirstHeading,
  extractFirstImage,
} from "../../helper/Utils/ParagraphExtract";
import BlogCard from "./Card";

const BlogContentExtractor = ({ val }) => {
  const Paragraph = extractFirstParagraph(val);
  const Heading = extractFirstHeading(val);
  const imgSrc = extractFirstImage(val);

  return (
    <div>
      <BlogCard
        Paragraph={Paragraph}
        Heading={Heading}
        Image={imgSrc}
        val={val}
      />
    </div>
  );
};

export default BlogContentExtractor;
