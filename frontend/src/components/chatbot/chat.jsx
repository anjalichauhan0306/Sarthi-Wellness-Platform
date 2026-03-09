import { useState } from 'react'

export default function ChatWidget() {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-white text-2xl shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 z-50 flex items-center justify-center animate-bounce"
            >
                💬
            </button>

            {/* Full Screen Chat */}
            {open && (
                <div className="fixed inset-0 bg-white z-[100] flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-orange-200 bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                        <h2 className="text-lg font-semibold">Talk to Sarathi • Share what’s on your mind</h2>
                        <button onClick={() => setOpen(false)} className="text-xl">✕</button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 text-gray-700">
                        <div className="max-w-3xl mx-auto mb-4 text-sm text-orange-500">
                            You can share your worries, confusion, stress, fears, or anything in your heart. Sarathi will listen and gently guide you with calm and meaningful advice.
                        </div>
                        <div className="max-w-3xl mx-auto space-y-4">
                            <p className="bg-orange-50 p-3 rounded-xl inline-block">Hello 🙏 I am your Sarathi. Ask anything.</p>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-orange-200 p-4 bg-white">
                        <div className="max-w-3xl mx-auto flex gap-3">
                            <input
                                className="flex-1 p-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-400 outline-none"
                                placeholder="Type your question..."
                            />
                            <button className="px-6 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition">Send</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
