import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Join Our Community for Exclusive Content!</h2>
        <p className="text-gray-500 my-2">
          Discover your next read! Dive into our collection of engaging
          articles, thought-provoking insights, and actionable tips.
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          Lern More
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://adespresso.com/wp-content/uploads/2021/05/Call-to-action.jpeg"
          alt="callToAction"
        />
      </div>
    </div>
  );
}
