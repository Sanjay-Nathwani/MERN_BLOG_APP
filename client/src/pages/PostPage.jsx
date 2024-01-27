import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { isblEditorDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactDOMServer from "react-dom/server";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";

export default function PostPage() {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);

  const postContentRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setLoading(false);
          return;
        } else {
          setPost(data.posts[0]);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  // console.log(post?.content);

  useEffect(() => {
    if (postContentRef.current) {
      const codeBlocks = postContentRef.current.querySelectorAll(
        'pre.ql-syntax[spellcheck="false"]'
      );

      if (codeBlocks.length > 0) {
        codeBlocks.forEach((codeBlock) => {
          const code = codeBlock.textContent;
          const language = codeBlock.getAttribute("language") || "javascript";

          const highlightedCode = (
            <ReactSyntaxHighlighter language={language} style={isblEditorDark}>
              {code}
            </ReactSyntaxHighlighter>
          );

          const highlightedCodeNode = document.createElement("div");
          highlightedCodeNode.innerHTML =
            ReactDOMServer.renderToString(highlightedCode);

          try {
            codeBlock.parentNode.insertBefore(highlightedCodeNode, codeBlock);
            codeBlock.remove();
          } catch (error) {
            console.error("Error highlighting code block:", error);
          }
        });
      }
    }

    const addCopyButtons = () => {
      const codeBlocks = postContentRef.current.querySelectorAll("pre"); // Select original code blocks

      if (codeBlocks.length > 0) {
        codeBlocks.forEach((codeBlock) => {
          const parentDiv = codeBlock.parentNode; // Get the parent div

          // Add margin-top to the pre tag itself
          codeBlock.style.paddingTop = "30px";
          const copyButton = document.createElement("button");
          copyButton.textContent = "Copy";
          copyButton.classList.add("copy-button"); // Optional class for styling

          // Style the button text
          copyButton.style.color = "white";
          copyButton.style.fontWeight = "bold";

          // Position the button at the top right corner
          copyButton.style.position = "absolute";
          copyButton.style.top = "3px";
          copyButton.style.right = "10px";

          // Ensure the parent div has relative positioning
          parentDiv.style.position = "relative";

          copyButton.addEventListener("click", () => {
            const codeText = codeBlock.textContent; // Access code text from the pre tag

            navigator.clipboard
              .writeText(codeText)
              .then(() => {
                // Optionally display a success message
                alert("Code copied to clipboard!");
              })
              .catch((error) => {
                console.error("Error copying code:", error);
              });
          });

          parentDiv.appendChild(copyButton); // Append button to parent div
        });
      }
    };

    addCopyButtons();
  }, [post]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size={"xl"} />
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl text-center mt-10 p-3 font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex items-center justify-between p-3 border-b border-slate-500 max-w-2xl w-full mx-auto text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)}{" "}
          {post && (post.content.length / 1000).toFixed(0) === 1
            ? "min"
            : "mins"}{" "}
          read
        </span>
      </div>
      <div
        className="p-3 max-w-[680px] mx-auto w-full post-content"
        ref={postContentRef}
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      />
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post && post._id} />
    </main>
  );
}
