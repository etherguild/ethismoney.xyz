import { parse } from "yaml";
import useSWR from "swr";
import InfoAccordion from "../InfoAccordion";


const Glossary = () => {
  const {
    data: faqData,
    error,
  } = useSWR("/glossary.yml", async (url) => {
    const res = await fetch(url);
    const text = await res.text();
    return parse(text);
  });

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

export default Glossary;