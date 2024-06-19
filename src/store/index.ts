import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import characterStats from "./characterStatsSlice";
import characterEquipment from "./characterEquipmentSlice";
// import characterMasteryBonus from "./characterMasteryBonusSlice";
const store = configureStore({
  reducer: {
    characterStats,
    characterEquipment,
    // characterMasteryBonus,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
