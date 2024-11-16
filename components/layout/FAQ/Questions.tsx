import { parse } from "yaml";
import useSWR from "swr";
import InfoAccordion from "../InfoAccordion";
import { useState } from "react";


const Questions = () => {
  const {
    data: faqData,
    error,
  } = useSWR("/questions.yml", async (url) => {
    const res = await fetch(url);
    const text = await res.text();
    return parse(text);
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (error) return <div>Failed to load</div>;

  if (!faqData) return <div>Loading...</div>;


  return (
    <>
      {faqData.map((item, index) => (
        <InfoAccordion
          key={index}
          height={52}
          title={item.question}
        >
          {item.answer}
        </InfoAccordion>
      ))}
    </>
  );
};

export default Questions;