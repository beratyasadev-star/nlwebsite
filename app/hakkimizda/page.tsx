export default function HakkimizdaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Hakkımızda
            </h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                NL Onderwijs, Hollanda'daki mültecilere rehberlik etmek ve onların hayatlarını 
                kolaylaştırmak amacıyla kurulmuş bir platformdur. Amacımız, yeni gelen mültecilere Hollanda'daki 
                yaşam hakkında doğru ve güncel bilgiler sunmaktır.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Misyonumuz</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Hollanda'ya yeni gelen mültecilerin entegrasyon süreçlerinde karşılaştıkları zorlukları 
                en aza indirmek ve onlara bu süreçte rehberlik etmek. IND işlemleri, sağlık sigortası, eğitim, 
                iş bulma gibi konularda güvenilir bilgi kaynağı olmak.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Vizyonumuz</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Hollanda'daki en kapsamlı ve güvenilir Türkçe bilgi platformu olmak. Mülteci topluluğunu 
                bir araya getirerek, deneyim paylaşımını ve dayanışmayı teşvik etmek.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Ne Sunuyoruz?</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                <li>IND işlemleri ve ikamet izni başvuruları hakkında detaylı bilgiler</li>
                <li>Sağlık sigortası (Zorgverzekering) rehberi</li>
                <li>COA, DigiD, BSN gibi resmi işlemler hakkında adım adım kılavuzlar</li>
                <li>Eğitim ve dil öğrenimi imkanları</li>
                <li>İş bulma ve kariyer geliştirme tavsiyeleri</li>
                <li>Güncel haberler ve duyurular</li>
                <li>Sık sorulan sorular ve cevapları</li>
                <li>WhatsApp topluluk desteği</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">İletişim</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Sorularınız, önerileriniz veya katkıda bulunmak isterseniz bizimle iletişime geçebilirsiniz. 
                Topluluğumuzun bir parçası olmak için WhatsApp grubumuz katılabilir veya sosyal medya hesaplarımızı 
                takip edebilirsiniz.
              </p>

              <div className="bg-sky-50 border-l-4 border-sky-600 p-6 mt-8">
                <p className="text-gray-800 font-medium">
                  💙 Hollanda'daki yeni hayatınızda size rehberlik etmekten mutluluk duyuyoruz!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
