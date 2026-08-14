import Reveal from './Reveal';

const feats = [
  { n: '01', t: 'La preuve en photo', d: 'À chaque diagnostic, on prend des photos de l’usure réelle de votre voiture. Vous voyez ce qui est à changer — pas de mauvaise surprise.' },
  { n: '02', t: 'Spécialistes clim', d: 'La climatisation, c’est notre point fort. Recharge et diagnostic rapides, pour rouler au frais toute l’année.' },
  { n: '03', t: 'Payez en 3x ou 4x', d: 'Une grosse réparation ? Étalez le paiement en 3 ou 4 fois par carte, simplement. On s’occupe de tout.' },
  { n: '04', t: 'Fidélité récompensée', d: 'Cagnotte fidélité et suivi de votre véhicule : plus vous revenez, plus vous êtes gagnant.' },
];

export default function WhyUs() {
  return (
    <section id="pourquoi" className="bg-wash py-[74px]">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mx-auto mb-11 max-w-2xl text-center">
            <span className="inline-block rounded-full bg-red-wash px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-red">Pourquoi nous choisir</span>
            <h2 className="mb-3 mt-3 text-[34px] font-extrabold tracking-tight text-ink">Un garage en qui vous pouvez avoir confiance</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {feats.map((f, i) => (
            <Reveal key={f.n} delay={(i % 4) * 70}>
              <div className="h-full">
                <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-navy font-extrabold text-white">{f.n}</div>
                <h3 className="mb-1.5 text-lg font-bold text-ink">{f.t}</h3>
                <p className="text-[14.5px] text-body">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
