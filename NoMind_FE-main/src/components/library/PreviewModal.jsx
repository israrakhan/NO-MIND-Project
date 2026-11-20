import { useEffect } from 'react'

export default function PreviewModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose()
    }
  }
  return (
    <div 
      id="modal-overlay"
      onClick={handleOutsideClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/40 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative bg-surface rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-outline-variant/30 animate-scale-up">
        
        {/* Modal Header */}
        <div className="p-6 flex justify-between items-center border-b border-outline-variant/30">
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            प्रिव्ह्यू: रहस्य मनाचे - प्रकरण १
          </h3>
          <button 
            onClick={onClose}
            className="material-symbols-outlined text-primary hover:text-secondary text-[24px] cursor-pointer select-none"
            aria-label="Close modal"
          >
            close
          </button>
        </div>
        
        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 font-body-lg text-on-surface-variant leading-relaxed text-sm md:text-base" data-lenis-prevent>
          <h4 className="font-display-lg text-2xl md:text-3xl mb-8 text-primary font-bold">
            १. NLP : एक सोपी ओळख
          </h4>
          <p className="mb-6 italic text-secondary font-medium">
            "विचार बदलला की भाषा बदलते, भाषा बदलली की कृती बदलते आणि कृती बदलली की आयुष्य बदलतं."
          </p>
          <p className="mb-6">
            आपल्या आयुष्यात आपण अनेकदा स्वतःशी बोलतो, कधी मनातच, कधी मोठ्याने. "मी हे करू शकेन का?", "लोक काय म्हणतील?", "माझ्याकडून चुकलं तर?", "मी इतका भाग्यवान नाही" अशा विचारांची नकारात्मक शृंखला सतत मनात फिरत राहते. हे शब्द फक्त शब्द नसतात; हे आपल्या मनावर, शरीरावर, वर्तनावर खोल ठसा उमटवतात. हळूहळू आपल्याला वाटतं की आपण ज्या गोष्टींवर विश्वास ठेवतो, तसंच आयुष्य आपोआप बनतं.
          </p>
          <p className="mb-6">
            इथेच येतो NLP: Neuro Linguistic Programming. नाव थोडं जटिल वाटतं, पण यात काही अवघड नाही. Neuro म्हणजे मन आणि मेंदू, Linguistic म्हणजे भाषा आणि NLP म्हणजे आपली सवय, आपला ठरलेला मानसिक पॅटर्न. म्हणजे आपले विचार, भाषा आणि वर्तन यांचा अभ्यास. हे तिन्ही घटक एकमेकांशी जोडलेले आहेत. विचार बदलला की भाषा बदलते, भाषा बदलली की कृती बदलते आणि कृती बदलली की आयुष्य बदलतं. या तिन्ही घटकांचा त्रिकोणच NLP चा Golden Triangle आहे.
          </p>
          
          {/* Highlight Quote Block */}
          <div className="bg-surface-tan p-8 rounded-2xl border-l-4 border-secondary my-8 shadow-inner">
            <p className="font-quote text-quote text-primary font-medium italic text-base md:text-lg">
              "आपण आपल्या मनाला सतत जे संदेश देतो, त्याचा प्रभाव थेट आपल्या जीवनावर पडतो."
            </p>
          </div>
          
          <p className="mb-4">
            ...पुढील भाग संपूर्ण पुस्तकात वाचा.
          </p>
        </div>
        
        {/* Modal Footer Actions */}
        <div className="p-6 bg-surface-container-high border-t border-outline-variant/25 flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => alert("Redirecting to online purchase portal for full book...")}
            className="bg-[#BC6034] text-white px-8 py-3 rounded-lg font-bold hover:brightness-95 transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            पूर्ण पुस्तक अनलॉक करा (Unlock Full Book)
          </button>
          <button 
            onClick={onClose}
            className="border border-primary text-primary px-8 py-3 rounded-lg hover:bg-primary/5 transition-all cursor-pointer font-semibold"
          >
            प्रिव्ह्यू बंद करा (Close Preview)
          </button>
        </div>

      </div>
    </div>
  )
}
