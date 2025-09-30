import React, { useState } from 'react';
import type { Notification, NotificationType } from '../types';
import { NOTIFICATIONS } from '../data/demo';
import { ICONS } from '../constants';

const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
        case 'approval': return { icon: ICONS.notification_approval, color: 'bg-green-100 text-green-600' };
        case 'comment': return { icon: ICONS.notification_comment, color: 'bg-blue-100 text-blue-600' };
        case 'sale': return { icon: ICONS.notification_sale, color: 'bg-purple-100 text-purple-600' };
        case 'system': return { icon: ICONS.notification_system, color: 'bg-gray-100 text-gray-600' };
        default: return { icon: ICONS.bell, color: 'bg-gray-100 text-gray-600' };
    }
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const { icon, color } = getNotificationIcon(notification.type);
    
    return (
        <div className={`flex items-start p-4 space-x-4 border-l-4 ${notification.read ? 'border-gray-200 bg-white' : 'border-primary bg-primary-light/10'} hover:bg-gray-50 transition-colors`}>
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
                {icon}
            </div>
            <div className="flex-1">
                <p className="font-semibold text-gray-800">{notification.title}</p>
                <p className="text-sm text-gray-600">{notification.description}</p>
            </div>
            <div className="text-right text-xs text-gray-400">
                <p>{notification.timestamp}</p>
            </div>
        </div>
    );
};

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
    const [filter, setFilter] = useState<'All' | 'Unread'>('All');

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const filteredNotifications = notifications.filter(n => filter === 'All' || !n.read);
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="max-w-4xl mx-auto font-display">
            <div className="bg-white rounded-2xl shadow-lg">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-primary-dark">Notifications</h1>
                        <p className="text-gray-500">{unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-1 p-1 bg-gray-200 rounded-full">
                           {(['All', 'Unread'] as const).map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${filter === f ? 'bg-primary text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                         <button onClick={markAllAsRead} className="text-sm text-primary hover:underline disabled:text-gray-400" disabled={unreadCount === 0}>
                            Mark all as read
                        </button>
                    </div>
                </div>

                {/* Notification List */}
                <div className="divide-y divide-gray-200">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map(notification => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))
                    ) : (
                        <div className="text-center p-12 text-gray-500">
                            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                {ICONS.bell}
                            </div>
                            <p>No {filter === 'Unread' ? 'unread' : ''} notifications here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;