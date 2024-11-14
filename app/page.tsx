export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center overflow-none"
      style={{
        background: 'linear-gradient(176deg, #B7DDE8 -4.56%, #F1F9FC 11.24%, #F1F9FC 27.05%)',
        backgroundSize: "max(100%, 1565px) 6317px",
      }}>
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: '#1B3555' }}>
          ETH is Money
        </h1>
        <p className="text-xl md:text-2xl" style={{ color: '#1B3555' }}>
          Coming Soon
        </p>
      </div>
    </main>
  )
}
