import { createContext, ReactNode, useContext, useReducer } from "react";

type Action = { type: "increment" } | { type: "decrement" };
type Dispatch = (action: Action) => void;
type State = { count: number };
type RegProviderProps = { children: ReactNode };

const RegStateContext = createContext<
	{ state: State; dispatch: Dispatch } | undefined
>(undefined);

const regReducer = (state: State, action: Action) => {
	switch (action.type) {
		case "increment": {
			return { count: state.count + 1 };
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
};

const RegProvider = ({ children }: RegProviderProps) => {
	const [state, dispatch] = useReducer(regReducer, { count: 0 });
	const value = { state, dispatch };

	return (
		<RegStateContext.Provider value={value}>
			{children}
		</RegStateContext.Provider>
	);
};

const useReg = () => {
	const context = useContext(RegStateContext);
	if (context === undefined) {
		throw new Error("useCount must be used within a CountProvider");
	}

	return context;
};

export { RegProvider, useReg };
