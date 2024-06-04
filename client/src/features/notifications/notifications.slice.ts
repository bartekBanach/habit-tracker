import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { Notification } from './components/NotificationItem';
import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import { nanoid } from '@reduxjs/toolkit';

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    /**
     * Add a notification to the list
     *
     * @param state - Our current Redux state
     * @param payload - A notification item without an id, as we'll generate this.
     */
    addNotification: (
      state,
      { payload }: PayloadAction<Omit<Notification, 'id'>>
    ) => {
      const notification: Notification = {
        id: nanoid(),
        ...payload,
      };

      state.notifications.push(notification);
    },
    /**
     * Remove a notification from the list
     *
     * @param state - Our current Redux state
     * @param payload - The id of the Notification to dismiss
     */
    dismissNotification: (
      state,
      { payload }: PayloadAction<Notification['id']>
    ) => {
      const index = state.notifications.findIndex(
        (notification) => notification.id === payload
      );

      if (index !== -1) {
        state.notifications.splice(index, 1);
      }
    },
  },
});

const { reducer, actions } = notificationsSlice;

// Actions
export const { addNotification, dismissNotification } = actions;

// Selectors
const selectNotifications = (state: RootState) =>
  state.notifications.notifications;

// Hooks
export const useNotifications = () => useAppSelector(selectNotifications);

export default reducer;
