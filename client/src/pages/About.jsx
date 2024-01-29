import { useEffect, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set isVisible to true after a delay to trigger animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
            About Sanjay&apos;s Blog
          </h1>
          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            <p>
              Welcome to Sanjay&apos;s Blog! This blog was created by Sanjay
              Nathwani as a personal project to share his thoughts and ideas
              with the world. Sanjay is a passionate developer who loves to
              write about technology, coding, and everything in between.
            </p>

            <p className="mt-4">
              On this blog, you&apos;ll find weekly articles and tutorials on
              topics such as web development, software engineering, and
              programming languages. Sanjay is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p className="mt-4">
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people&apos;s comments and reply
              to them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
