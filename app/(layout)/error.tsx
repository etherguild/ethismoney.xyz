"use client"; // Error components must be Client Components
import Link from "next/link";

const Error = ({
  error,
  reset,
  message,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  message?: string | void;
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-[48px] mb-[30px] leading-snug">Something went wrong ...</h1>
        <p className="text-center text-lg">The page you requested currently has some issues and our devs have been notified. We can recommend checking out one of these pages:</p>
        <Link href="/" className="text-blue-500">Home</Link>
      </div>
      {/* <ErrorGen
        header={"Something went wrong ..."}
        subheader={
          " The page you requested currently has some issues and our devs have been notified. We can recommend checking out one of these pages:"
        }
      /> */}
    </>
  );
};

Error.getInitialProps = ({ res, err, asPath }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, originalUrl: asPath };
};

export default Error;
