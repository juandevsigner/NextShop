import { UiState } from ".";

type UiActionType = { type: "[UI] - ToggleMenu" };

export const uiReducer = (state: UiState, action: UiActionType) => {
  switch (action.type) {
    case "[UI] - ToggleMenu":
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    default:
      return state;
  }
};
