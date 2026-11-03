import LocalChart from '@/components/LocalChart';
export default function HomePage() {
  return <main id="conteudo" className="content-width main-content">
    <section className="intro">
      <h1>Seu mapa Zi Wei,<br /><span>em português.</span></h1>
      <p>Explore as doze casas e as estrelas de uma tradição astrológica chinesa. Um mapa básico, calculado no seu navegador, para conhecer e estudar.</p>
      <p className="intro-note">Demonstração independente de código aberto. Sem interpretação por IA, conta ou pagamento.</p>
    </section>
    <LocalChart />
  </main>;
}