import { useContext, createContext, useState } from "react";

export const PositionContext = createContext();
// eslint-disable-next-line react/prop-types
export const PositionProvider = ({ children }) => {
	const [scrollPosition, setScrollPosition] = useState({
		home: true,
		about: false,
		contact: false,
		calendar: false,
	});

	return (
		<PositionContext.Provider value={{ scrollPosition, setScrollPosition }}>
			{children}
		</PositionContext.Provider>
	);
};

export const usePositionValue = () => useContext(PositionContext);
