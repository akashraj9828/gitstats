import { useState, useEffect, useRef } from "react";
/* 
function useDebounce
function useDocumentTitle
function useAnimation
function useAnimationTimer
function useWindowSize
function useHover
function useLocalStorage
*/

// Hook
export function useDebounce(value, delay) {
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(
		() => {
			// Update debounced value after delay
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);

			// Cancel the timeout if value changes (also on delay change or unmount)
			// This is how we prevent debounced value from updating if value is changed ...
			// .. within the delay period. Timeout gets cleared and restarted.
			return () => {
				clearTimeout(handler);
			};
		},
		[value, delay] // Only re-call effect if value or delay changes
	);

	return debouncedValue;
} /* Custom hooks from https://usehooks.com/ */

export function useDocumentTitle(title, retainOnUnmount = false) {
	const defaultTitle = useRef(document.title);

	useEffect(() => {
		document.title = title;
	}, [title]);

	useEffect(() => {
		return () => {
			if (!retainOnUnmount) {
				document.title = defaultTitle.current;
			}
		};
	}, [retainOnUnmount]);
}

// Hook
export function useAnimation(easingName = "linear", duration = 500, delay = 0) {
	// The useAnimationTimer hook calls useState every animation frame ...
	// ... giving us elapsed time and causing a rerender as frequently ...
	// ... as possible for a smooth animation.
	const elapsed = useAnimationTimer(duration, delay);
	// Amount of specified duration elapsed on a scale from 0 - 1
	const n = Math.min(1, elapsed / duration);
	// Return altered value based on our specified easing function
	return easing[easingName](n);
}

// Some easing functions copied from:
// https://github.com/streamich/ts-easing/blob/master/src/index.ts
// Hardcode here or pull in a dependency
const easing = {
	linear: (n) => n,
	elastic: (n) => n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
	inExpo: (n) => Math.pow(2, 10 * (n - 1)),
};

export function useAnimationTimer(duration = 1000, delay = 0) {
	const [elapsed, setTime] = useState(0);

	useEffect(
		() => {
			let animationFrame, timerStop, start;

			// Function to be executed on each animation frame
			function onFrame() {
				setTime(Date.now() - start);
				loop();
			}

			// Call onFrame() on next animation frame
			function loop() {
				animationFrame = requestAnimationFrame(onFrame);
			}

			function onStart() {
				// Set a timeout to stop things when duration time elapses
				timerStop = setTimeout(() => {
					cancelAnimationFrame(animationFrame);
					setTime(Date.now() - start);
				}, duration);

				// Start the loop
				start = Date.now();
				loop();
			}

			// Start after specified delay (defaults to 0)
			const timerDelay = setTimeout(onStart, delay);

			// Clean things up
			return () => {
				clearTimeout(timerStop);
				clearTimeout(timerDelay);
				cancelAnimationFrame(animationFrame);
			};
		},
		[duration, delay] // Only re-run effect if duration or delay changes
	);

	return elapsed;
}

// Hook
export function useWindowSize() {
	const isClient = typeof window === "object";

	function getSize() {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined,
		};
	}

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (!isClient) {
			return false;
		}

		function handleResize() {
			setWindowSize(getSize());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return windowSize;
}

// Hook
export function useHover() {
	const [value, setValue] = useState(false);

	const ref = useRef(null);

	const handleMouseOver = () => setValue(true);
	const handleMouseOut = () => setValue(false);

	useEffect(
		() => {
			const node = ref.current;
			if (node) {
				node.addEventListener("mouseover", handleMouseOver);
				node.addEventListener("mouseout", handleMouseOut);

				return () => {
					node.removeEventListener("mouseover", handleMouseOver);
					node.removeEventListener("mouseout", handleMouseOut);
				};
			}
		},
		[ref] // Recall only if ref changes
	);

	return [ref, value];
}

// Hook
export function useLocalStorage(key, initialValue) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			console.log(error);
			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			// Save state
			setStoredValue(valueToStore);
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log(error);
		}
	};

	return [storedValue, setValue];
}
