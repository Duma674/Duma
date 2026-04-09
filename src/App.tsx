import { CheckCircle2, Lock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, FormEvent } from 'react';

type LegalPage = 'privacy' | 'legal' | 'cookies' | null;

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeLegal, setActiveLegal] = useState<LegalPage>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Datos para Brevo
    const formData = new FormData();
    formData.append('NOMBRE', name);
    formData.append('EMAIL', email);
    formData.append('locale', 'es');
    formData.append('html_type', 'simple');

    try {
      // Enviamos a Brevo (usamos mode: 'no-cors' porque Brevo no devuelve cabeceras CORS en el form simple)
      await fetch('https://87963f08.sibforms.com/serve/MUIFAP-ESAgZG3v1pAVSrl8zV6KBKQZ_wYGzOwIqnwlgbhwTEytWu-9SmvM-GGaKpM0FHbRcwXJsOZdR4JSFty65TAjAe75AiDyx7E9xSYgMVGpJgrcZi2joiij6Lyyn97N2LWUt8yMPCJbsRngOWZWMG_ZfB4am3oKPji9aR9PF87Vn6XnlvOYLbFQqEj9kw77pqieiYhIEb7q76g==', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      console.log('Lead enviado a Brevo:', { name, email });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error al enviar a Brevo:', error);
      // Aun así mostramos el éxito al usuario para no romper la experiencia
      setIsSubmitted(true);
    }
  };

  const LegalModal = ({ type, onClose }: { type: LegalPage; onClose: () => void }) => {
    if (!type) return null;

    const content = {
      legal: {
        title: 'Aviso Legal',
        body: `
          <h3 className="font-bold mt-4">1. Datos Identificativos</h3>
          <p>En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos: el titular de dominio web es Fita Horitzo, con domicilio a estos efectos en Av. de la bartra 13, edifici gemels II, número de C.I.F.: PP4503544 y correo electrónico de contacto: domenecpol@gmail.com.</p>
          
          <h3 className="font-bold mt-4">2. Usuarios</h3>
          <p>El acceso y/o uso de este portal de Fita Horitzo atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.</p>
          
          <h3 className="font-bold mt-4">3. Uso del Portal</h3>
          <p>deinversoratrader.com proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a Fita Horitzo o a sus licenciantes a los que el USUARIO pueda tener acceso.</p>
        `
      },
      privacy: {
        title: 'Política de Privacidad',
        body: `
          <h3 className="font-bold mt-4">1. Responsable del Tratamiento</h3>
          <p>El responsable del tratamiento de sus datos es Fita Horitzo, con NIF PP4503544 y domicilio en Av. de la bartra 13, edifici gemels II.</p>
          
          <h3 className="font-bold mt-4">2. Finalidad del Tratamiento</h3>
          <p>Tratamos la información que nos facilitan las personas interesadas con el fin de gestionar el envío de la información que nos soliciten, facilitar a los interesados ofertas de productos y servicios de su interés.</p>
          
          <h3 className="font-bold mt-4">3. Legitimación</h3>
          <p>La base legal para el tratamiento de sus datos es el consentimiento del interesado al facilitar sus datos a través de nuestro formulario de suscripción.</p>
        `
      },
      cookies: {
        title: 'Política de Cookies',
        body: `
          <h3 className="font-bold mt-4">1. ¿Qué son las cookies?</h3>
          <p>Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.</p>
          
          <h3 className="font-bold mt-4">2. Tipos de cookies utilizadas</h3>
          <p>Este sitio web utiliza cookies técnicas para el funcionamiento del sitio y cookies de análisis (como Google Analytics) para medir la audiencia y mejorar nuestros servicios.</p>
        `
      }
    };

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 relative shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-slate-500" />
          </button>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{content[type].title}</h2>
          <div 
            className="text-slate-600 space-y-4 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content[type].body }}
          />
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
            <button 
              onClick={onClose}
              className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white font-sans text-slate-900">
        <header className="bg-slate-950 py-12 px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-green-500/20">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">¡Acceso Concedido, {name}!</h1>
            <p className="text-xl text-slate-400">Ya puedes descargar tu guía y ver el vídeo de configuración debajo.</p>
          </motion.div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
          {/* Download Section */}
          <section className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 text-center">
            <h3 className="text-2xl font-bold mb-6">1. Descarga tu Ebook e Indicador</h3>
            <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
              <img 
                src="https://static.deinversoratrader.com/2026/04/Diseno-sin-titulo-2026-04-09T135544.367-Photoroom.png" 
                alt="Ebook" 
                className="w-32 shadow-xl"
              />
              <div className="text-left space-y-4">
                <p className="text-slate-600 max-w-xs">Haz clic en los botones de abajo para obtener tus recursos gratuitos.</p>
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://static.deinversoratrader.com/securepdfs/2026/04/Tunel-de-Domenec-en-trading-¿Que-es-y-como-funciona.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Guia-Tunel-Domenec.pdf"
                    className="inline-block bg-orange-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20 text-center"
                  >
                    📥 DESCARGAR EBOOK (PDF)
                  </a>
                  <a 
                    href="https://deinversoratrader.com/wp-content/uploads/2025/10/TunelDomenec-v4.ex4" 
                    download
                    className="inline-block bg-slate-800 text-white font-bold py-4 px-8 rounded-xl hover:bg-slate-900 transition-colors shadow-lg shadow-slate-900/20 text-center"
                  >
                    📊 DESCARGAR INDICADOR
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <section className="space-y-6">
            <h3 className="text-2xl font-bold text-center">2. Vídeo de Configuración Paso a Paso</h3>
            <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/aQiUdjzxdh4" 
                title="Vídeo de Configuración Túnel Domènec" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* Step 3: Upsell Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-950 p-8 md:p-12 rounded-3xl text-center text-white shadow-2xl border border-orange-500/20"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6">3. Pasa al Siguiente Nivel: Opera en Directo con Nosotros</h3>
            <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 text-lg">
              Ya tienes la teoría y la configuración exacta en tus manos. Pero si quieres dejar de adivinar frente al gráfico, ver cómo aplicamos este indicador todos los días, detectar entradas claras en tiempo real y rodearte de una comunidad de +1.000 traders que hablan tu mismo idioma, te estamos esperando dentro.
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://deinversoratrader.com/hazte-miembro/" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-orange-600 text-white font-black py-5 px-10 rounded-xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/40 text-lg md:text-xl"
            >
              🚀 SÍ, QUIERO ENTRAR A LA COMUNIDAD DE DOC
            </motion.a>
          </motion.section>

          <div className="text-center pt-8">
            <p className="text-slate-500 italic">También hemos enviado una copia a <strong>{email}</strong></p>
          </div>
        </main>

        <footer className="py-12 text-center text-slate-400 text-xs border-t border-slate-100">
          <div className="flex flex-wrap justify-center gap-x-4 mb-4">
            <button onClick={() => setActiveLegal('privacy')} className="hover:text-slate-600 transition-colors">Política de Privacidad</button>
            <button onClick={() => setActiveLegal('legal')} className="hover:text-slate-600 transition-colors">Aviso Legal</button>
            <button onClick={() => setActiveLegal('cookies')} className="hover:text-slate-600 transition-colors">Política de Cookies</button>
          </div>
          <p>&copy; {new Date().getFullYear()} Túnel Domènec. Todos los derechos reservados.</p>
        </footer>

        <AnimatePresence>
          {activeLegal && (
            <LegalModal type={activeLegal} onClose={() => setActiveLegal(null)} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900">
      {/* Hero Section */}
      <header className="bg-slate-950 py-12 md:py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 rounded-full border border-orange-500/20"
          >
            RECURSO EXCLUSIVO PARA TRADERS DE ANÁLISIS TÉCNICO
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            Filtra el ruido del mercado y detecta entradas claras con el indicador <span className="text-orange-500">Túnel Domènec</span>
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Descarga gratis la guía visual y el vídeo de configuración paso a paso que usamos a diario en la comunidad de doc de +1.000 traders.
          </motion.h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Image Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex items-center justify-center p-4 lg:p-12"
          >
            {/* Background Glow - Makes the image pop */}
            <div className="absolute inset-0 bg-orange-500/10 blur-[100px] rounded-full transform scale-75"></div>
            
            {/* Mockup Image Container */}
            <div className="relative z-10 group">
              <img 
                src="https://static.deinversoratrader.com/2026/04/Diseno-sin-titulo-2026-04-09T135544.367-Photoroom.png" 
                alt="Guía Túnel Domènec Mockup"
                referrerPolicy="no-referrer"
                className="w-full max-w-[420px] h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Floating Badge */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-6 -right-6 bg-orange-600 text-white text-sm font-black px-6 py-3 rounded-xl shadow-xl transform rotate-12 border-2 border-white"
              >
                PDF + VÍDEO GRATIS
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Benefits & Form */}
          <div className="space-y-10">
            {/* Benefits List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 p-1 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Configuración exacta</h3>
                  <p className="text-slate-600">Los parámetros que usamos en ProRealTime.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 p-1 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Filtro de entradas falsas</h3>
                  <p className="text-slate-600">Cómo saber cuándo el precio está engañando antes de una ruptura.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 p-1 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Vídeo Práctico</h3>
                  <p className="text-slate-600">Pantalla grabada viendo el indicador en acción en el mercado real.</p>
                </div>
              </div>
            </div>

            {/* Lead Capture Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                ¿Dónde te enviamos el acceso?
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Tu mejor correo electrónico"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 px-6 bg-orange-600 hover:bg-orange-700 text-white font-black text-lg md:text-xl rounded-xl shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
                >
                  👉 ENVIARME LA GUÍA Y EL VÍDEO AHORA
                </motion.button>
              </form>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-sm">
                <Lock className="w-4 h-4" />
                <span>100% libre de spam. Tus datos están seguros.</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Authority Section */}
        <section className="mt-24 pt-16 border-t border-slate-100 text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-orange-500/20 shadow-lg">
              <img 
                src="https://static.deinversoratrader.com/2026/04/Sesion-sin-titulo0973-scaled.jpg" 
                alt="Domènec Suria" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-bold text-slate-900 text-xl">Domènec Suria</h4>
            <p className="text-orange-600 font-medium text-sm uppercase tracking-wider">Fundador de la comunidad de doc</p>
          </div>
          <p className="text-slate-600 leading-relaxed italic text-lg">
            "Soy Domènec Suria y gestiono la comunidad de doc de casi 1.000 inversores. Para proteger la calidad de los análisis y mantener el grupo libre de spam y vendehumos, tenemos las puertas blindadas. Sin embargo, he decidido liberar gratis el indicador que más usamos dentro para que puedas limpiar tus gráficos hoy mismo."
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 px-4 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
            <button onClick={() => setActiveLegal('privacy')} className="hover:text-slate-600 transition-colors">Política de Privacidad</button>
            <span className="hidden md:inline">|</span>
            <button onClick={() => setActiveLegal('legal')} className="hover:text-slate-600 transition-colors">Aviso Legal</button>
            <span className="hidden md:inline">|</span>
            <button onClick={() => setActiveLegal('cookies')} className="hover:text-slate-600 transition-colors">Política de Cookies</button>
          </div>

          {/* Risk Disclaimer */}
          <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto">
            AVISO DE RIESGO: El trading de instrumentos financieros conlleva un alto nivel de riesgo y puede no ser adecuado para todos los inversores. El contenido de esta web es estrictamente educativo y no constituye asesoramiento financiero.
          </p>

          {/* Meta Disclaimer */}
          <p className="text-[10px] md:text-xs text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Este sitio no forma parte del sitio web de Facebook ni de Facebook Inc. Este sitio NO está respaldado por Facebook de ninguna manera. FACEBOOK es una marca registrada de FACEBOOK, Inc.
          </p>
          
          <p className="text-[10px] text-slate-300">
            &copy; {new Date().getFullYear()} Túnel Domènec. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {activeLegal && (
          <LegalModal type={activeLegal} onClose={() => setActiveLegal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
