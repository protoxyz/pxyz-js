import { useProtocolAuth } from "@protoxyz/auth-react";
import { ResponseStatus, Session } from "@protoxyz/core";
import { useEffect, useState } from "react";

export function SecurityTabSessions() {
    const { client } = useProtocolAuth();
    const [sessions, setSessions] = useState<Session[]>([]);
    const [error, setError] = useState<string | null | undefined>(null);

    async function getSessions() {
        const sessions = await client.auth.sessions.list({});

        if (sessions.status === ResponseStatus.Success) {
            setSessions(sessions.data);
        } else {
            setError(sessions.error);
        }
    }

    useEffect(() => {
        getSessions();
    }, []);

    return (
        <div className="col-span-full py-24 md:col-span-2">
            <h2 className="text-base text-xl font-semibold leading-7 text-zinc-400">Sessions</h2>
            <p className="text-md mt-1 leading-6 text-zinc-300">
                Manage your active sessions and logout of any sessions you don't recognize.
            </p>
            <div className="mt-6">
                <div className="flow-root">
                    <ul className="-my-5 divide-y divide-gray-200">
                        {sessions.map((session) => (
                            <li key={session.id} className="py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-md font-medium leading-6 text-zinc-400">{session.device}</p>
                                        <p className="text-md mt-1 leading-6 text-zinc-300">
                                            {session.browser} - {session.os}
                                        </p>
                                        <p className="text-md mt-1 leading-6 text-zinc-300">
                                            {session.ip} - {session.cpu}
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <button
                                            type="button"
                                            className="text-primary-500 hover:text-primary-600 font-medium"
                                            onClick={async () => {
                                                const response = await client.auth.sessions.end({
                                                    query: { id: session.id },
                                                });

                                                if (response.status === ResponseStatus.Success) {
                                                    getSessions();
                                                }
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
