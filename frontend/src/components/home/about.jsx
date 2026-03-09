export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">

            <section className="max-w-5xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold text-orange-500 mb-6">About SARTHI</h1>
                <p className="text-gray-700 text-lg leading-relaxed">
                    Sarthi is a gentle digital companion designed to support your mind, body and soul. It is not just a chatbot — it is a space where you can share your thoughts, worries and daily struggles and receive calm, meaningful guidance.
                </p>

                <div className="mt-10 grid md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-2xl border border-orange-100 bg-white">
                        <h3 className="text-xl font-semibold text-orange-500">Mind</h3>
                        <p className="mt-3 text-gray-600">Daily motivation, focus guidance and habit building support to help you stay balanced and productive.</p>
                    </div>

                    <div className="p-6 rounded-2xl border border-orange-100 bg-white">
                        <h3 className="text-xl font-semibold text-orange-500">Body</h3>
                        <p className="mt-3 text-gray-600">Simple nutrition suggestions and mindful routines to keep your body healthy and energetic.</p>
                    </div>

                    <div className="p-6 rounded-2xl border border-orange-100 bg-white">
                        <h3 className="text-xl font-semibold text-orange-500">Soul</h3>
                        <p className="mt-3 text-gray-600">Wisdom inspired by Gita teachings to bring clarity, calmness and inner strength in everyday life.</p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-2xl font-semibold text-orange-500">Why Sarathi?</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Because sometimes people don’t need answers — they need understanding. Sarathi listens, supports and guides you towards better thoughts, better habits and a peaceful life.
                    </p>
                </div>
            </section>
        </div>
    )
}