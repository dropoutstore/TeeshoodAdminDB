import {IconX} from '@tabler/icons-react';
import React, {useEffect, useState} from 'react';

const Notification = ({
  message,
  isVisible,
  setErrorIsVisible,
}: {
  message: string;
  isVisible: boolean;
  setErrorIsVisible: React.Dispatch<React.SetStateAction<boolean | string>>;
}) => {
  // State to keep track of whether the notification is visible

  useEffect(() => {
    // If the notification is not meant to be shown, don't start the timer
    if (!isVisible) return;

    // Set a timer for 5 seconds after which the notification should disappear
    const timer = setTimeout(() => {
      setErrorIsVisible(false);
    }, 5000);

    // Clear the timer if the component is unmounted or the visibility changes
    return () => clearTimeout(timer);
  }, [isVisible]); // Dependencies: re-run the effect if `isVisibleInitially` changes

  // If the notification is not visible, render nothing
  if (!isVisible) return null;

  // Render the notification with Tailwind CSS classes applied for styling
  return (
    <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
      <div className="max-w-sm w-full bg-red-500 text-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="w-0 flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500"
                onClick={() => setErrorIsVisible(false)}
              >
                <span className="sr-only">Close</span>
                {/* X icon for closing */}
                <IconX />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
