import React from 'react';
import { useSelector } from 'react-redux';
import {
  useSubscribeMutation,
  useUnsubscribeMutation,
} from '../../../../store/services/allTickets';

export default function SubscriptionPage() {
  // State to track if the user is subscribed or not.
  // This should ideally come from your application's global state or API

  const user = useSelector((state) => state.auth.user);
  const [subscribe] = useSubscribeMutation();
  const [unsubscribe] = useUnsubscribeMutation();
  const isSubscribed = user.isPremium;

  // Handlers for subscribe and unsubscribe actions
  const handleSubscribe = async () => {
    await subscribe();
    window.location.reload();
    // Implement your subscription logic here
    // setIsSubscribed(true);
  };

  const handleUnsubscribe = async () => {
    await unsubscribe();
    window.location.reload();
    // Implement your unsubscription logic here
    // setIsSubscribed(false);
  };

  return (
    <div className="relative max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl p-5">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {isSubscribed ? 'Premium Plan' : 'Yearly'}
          </div>
          {isSubscribed ? (
            <React.Fragment>
              <p className="block mt-1 text-lg leading-tight font-medium text-black">
                Enjoy your premium benefits!
              </p>
              <p className="mt-2 text-gray-500">
                You have access to all premium features, including no online
                booking fees.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
                onClick={handleUnsubscribe}
                type="button"
              >
                Cancel Subscription
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="block mt-1 text-lg leading-tight font-medium text-black">
                Upgrade to premium to enjoy benefits!
              </p>
              <p className="mt-2 text-gray-500">
                No online booking fees and more exclusive perks for only
                $13.25/month.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
                onClick={handleSubscribe}
                type="button"
              >
                Upgrade to Premium
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
