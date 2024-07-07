"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const debounce = (fn, timeout = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
};

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((prompt) => {
        return (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

const Feed = () => {
  const [prompts, setPrompts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const search = async (key) => {
    console.log("key", key);
    const response = await fetch(`/api/prompt/search?key=${key}`);
    if (response.ok) {
      const prompts = await response.json();
      setPrompts(prompts);
    }
  };
  const debouncedSearch = debounce(search, 1000);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    debouncedSearch(e.target.value);
  };
  const handleTagClick = (tag) => {
    console.log("tag", tag);
    setSearchText(tag);
    search(tag.split("#")[1]);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
    })();
  }, []);

  return (
    <section className="feed">
      <form className="w-full">
        <input
          placeholder="Search"
          className="search_input"
          onChange={handleSearchChange}
          value={searchText}
        />
      </form>
      <PromptCardList data={prompts} handleTagClick={handleTagClick} />
    </section>
  );
};
export default Feed;
