import { Link } from 'react-router-dom'

export default function FeaturesPage() {
    const features = [
        { title: 'Daily Guidance', desc: 'Share your thoughts and receive calm supportive guidance from Sarathi.' },
        { title: 'Mind Habits', desc: 'Motivation, focus tips and small daily actions to improve your routine.' },
        { title: 'Nutrition Help', desc: 'Simple food and water suggestions to keep your body balanced.' },
        { title: 'Gita Wisdom', desc: 'Stories and lessons inspired by the Bhagavad Gita for clarity in life.' },
        { title: 'Emotional Support', desc: 'A safe space to express worries, fears and confusion anytime.' },
        { title: 'Personal Growth', desc: 'Build discipline, awareness and positive thinking step by step.' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold text-orange-500 text-center">Features</h1>
                <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
                    Sarathi is designed to guide your everyday life — helping your mind stay clear, your body stay balanced and your soul stay calm.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {features.map((f) => (
                        <div key={f.title} className="bg-white border border-orange-100 rounded-2xl p-6 hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-orange-500">{f.title}</h3>
                            <p className="mt-3 text-gray-600">{f.desc}</p>
                        </div>
                    ))}
                </div>


            </section>
        </div>
    )
}
