import Navbar from '../components/Navbar';
import { styles } from '../styles';
import { terms } from '../constants/terms';

const Term = ({title, description}) => {
  return (
    <div className='py-4'>
      <h2 className="text-secondary font-bold text-[24px]">{title}</h2>
      <p className="font-body font-light sm:text-[16px] text-[14px] text-white tracking-wider text-start m-auto">{description}</p>
    </div>
  )
}

const Terms = () => {
  return (
    <>
      <Navbar isHomePage={false} />
      <section className='sm:px-16 px-6 sm:py-16 py-10 max-w-7xl mx-auto relative z-0'>
        <h1 className={`${styles.sectionHeadText} pt-20`}>Terms</h1>
        <p className={`${styles.pText} py-10`}>Please read the following terms and conditions carefully. By accessing or using our website, you agree to be bound by these terms. If you do not agree with any part of these terms, please refrain from using our services</p>
        {terms.map(term => {
          return <Term key={term.title} {...term} />
        })}
      </section>
    </>
  )
}

export default Terms