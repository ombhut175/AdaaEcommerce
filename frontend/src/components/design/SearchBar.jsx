import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SearchBar = ({ isOpen, onToggle, darkMode }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [localSuggestions, setLocalSuggestions] = useState([]);
    const [apiSuggestions, setApiSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);

    const searchInputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // Static suggestions to show when the search query is empty.
    const staticSuggestions = [
        { id: "static-1", text: "Trending Product" },
        { id: "static-2", text: "New Arrivals" },
        { id: "static-3", text: "Best Sellers" },
    ];

    // Load local search history from local storage.
    const loadLocalSuggestions = () => {
        const storedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        return storedHistory.map((text, index) => ({ id: `history-${index}`, text }));
    };

    // Update local storage with a new search query.
    const updateLocalStorage = (query) => {
        if (!query) return;
        const storedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
        const newHistory = [query, ...storedHistory.filter((item) => item !== query)];
        localStorage.setItem("searchHistory", JSON.stringify(newHistory.slice(0, 10)));
    };

    // Clear the stored search history.
    const clearSearchHistory = () => {
        localStorage.removeItem("searchHistory");
        setLocalSuggestions([]);
    };

    // On mount, load the local suggestions.
    useEffect(() => {
        setLocalSuggestions(loadLocalSuggestions());
    }, []);

    // Whenever the search bar is opened, reload the local suggestions.
    useEffect(() => {
        if (isOpen) {
            setLocalSuggestions(loadLocalSuggestions());
        }
    }, [isOpen]);

    // When searchQuery changes and is non-empty, fetch API suggestions.
    useEffect(() => {
        if (!searchQuery.trim()) {
            setApiSuggestions([]);
            setIsLoading(false);
            return;
        }

        const fetchSuggestions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/api/products/suggestions`, {
                    params: { q: searchQuery },
                });
                setApiSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    // Handle search form submission.
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (query) {
            updateLocalStorage(query);
            setLocalSuggestions(loadLocalSuggestions()); // Immediate UI update
            onToggle();
            setShowSuggestions(false);
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setSearchQuery(""); // Clear input after submission
        }
    };

    // Show suggestions when the input receives focus.
    const handleSearchFocus = () => {
        setShowSuggestions(true);
    };

    // Handle suggestion click (either local, API, or static).
    const handleSuggestionClick = (suggestion) => {
        const query = suggestion.text;
        updateLocalStorage(query); // Save to localStorage
        setLocalSuggestions(loadLocalSuggestions()); // Refresh local suggestions
        setSearchQuery("");
        setShowSuggestions(false);
        onToggle();
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    // Handle keyboard navigation (arrow keys, Enter, Escape).
    const handleKeyDown = (e) => {
        if (!showSuggestions) return;

        const suggestions =
            searchQuery.trim() === ""
                ? [...localSuggestions, ...staticSuggestions]
                : [...localSuggestions, ...apiSuggestions];

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveSuggestionIndex((prevIndex) =>
                    prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveSuggestionIndex((prevIndex) =>
                    prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
                    handleSuggestionClick(suggestions[activeSuggestionIndex]);
                } else {
                    handleSearchSubmit(e);
                }
                break;
            case "Escape":
                setShowSuggestions(false);
                break;
            default:
                break;
        }
    };

    // Close suggestions (and possibly collapse the search bar) when clicking outside.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSuggestions(false);
                if (isOpen) {
                    onToggle();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onToggle]);

    // Reset active suggestion index when searchQuery changes.
    useEffect(() => {
        setActiveSuggestionIndex(-1);
    }, [searchQuery]);

    return (
        <div ref={searchContainerRef} className="relative">
            {/* Collapsed / Expanded Search Bar */}
            <motion.div
                initial={false}
                animate={{ width: isOpen ? "240px" : "40px" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative"
            >
                {!isOpen ? (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onToggle}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                        aria-label="Open search"
                    >
                        <FaSearch size={20} />
                    </motion.button>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSearchSubmit}
                        className="relative"
                    >
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={handleSearchFocus}
                            onKeyDown={handleKeyDown}
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            autoFocus
                            aria-label="Search input"
                        />
                        {/* Search icon inside the input */}
                        <FaSearch
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                            size={16}
                        />
                    </motion.form>
                )}
            </motion.div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
                {showSuggestions && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50"
                    >
                        {isLoading && (
                            <div className="px-4 py-2 text-gray-500 dark:text-gray-400">Loading...</div>
                        )}

                        {/* Local History Section with a red "Clear all" button */}
                        {!isLoading && localSuggestions.length > 0 && (
                            <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
                                <div className="px-4 py-1 flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    History
                  </span>
                                    <button
                                        onClick={clearSearchHistory}
                                        className="text-xs text-red-500 hover:underline"
                                        aria-label="Clear search history"
                                    >
                                        Clear all
                                    </button>
                                </div>
                                {localSuggestions.map((suggestion, index) => (
                                    <motion.div
                                        key={suggestion.id}
                                        whileHover={{
                                            backgroundColor: darkMode
                                                ? "rgb(55, 65, 81)"
                                                : "rgb(243, 244, 246)",
                                        }}
                                        className={`px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-300 ${
                                            activeSuggestionIndex === index ? "bg-gray-100 dark:bg-gray-700" : ""
                                        }`}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <FaSearch size={12} className="text-gray-400" />
                                            {suggestion.text}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* API Suggestions when the user has typed something */}
                        {!isLoading &&
                            searchQuery.trim() !== "" &&
                            apiSuggestions.length > 0 && (
                                <div className="pt-2">
                                    <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                        Suggestions
                                    </div>
                                    {apiSuggestions.map((suggestion, index) => (
                                        <motion.div
                                            key={suggestion.id}
                                            whileHover={{
                                                backgroundColor: darkMode
                                                    ? "rgb(55, 65, 81)"
                                                    : "rgb(243, 244, 246)",
                                            }}
                                            className={`px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-300 ${
                                                activeSuggestionIndex === index + localSuggestions.length
                                                    ? "bg-gray-100 dark:bg-gray-700"
                                                    : ""
                                            }`}
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            <div className="flex items-center gap-2">
                                                <FaSearch size={12} className="text-gray-400" />
                                                {suggestion.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}

                        {/* Static Suggestions when the search query is empty */}
                        {!isLoading && searchQuery.trim() === "" && (
                            <div className="pt-2">
                                <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                                    Popular Suggestions
                                </div>
                                {staticSuggestions.map((suggestion) => (
                                    <motion.div
                                        key={suggestion.id}
                                        whileHover={{
                                            backgroundColor: darkMode
                                                ? "rgb(55, 65, 81)"
                                                : "rgb(243, 244, 246)",
                                        }}
                                        className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-300"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <FaSearch size={12} className="text-gray-400" />
                                            {suggestion.text}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


