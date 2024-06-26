import { SVGProps } from 'react'

const Logo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='800'
      width='1200'
      viewBox='-107.3421 -298.5 930.2982 1791'
      {...props}
    >
      <g fillRule='evenodd' fill='none'>
        <path
          fill='#5A9DED'
          d='M357.2 901.161l358.414-224.965L357.2 1194zm53.295 29.281v93.57L525.27 858.259z'
        />
        <path
          fill='#D895D3'
          d='M393.88 433.792L658.468 583.49l-26.098 46.129-264.588-149.697z'
        />
        <path
          fill='#FF9C92'
          d='M357.2 0l357.2 614.809-357.2 225.29zm52.675 196.753v547.82l233.291-147.14z'
        />
        <path
          fill='#53D3E0'
          d='M358.414 901.161L0 676.196 358.414 1194zm-53.295 29.281v93.57L190.345 858.259z'
        />
        <path
          fill='#A6E275'
          d='M310.588 438.79L46 588.487l26.1 46.129 264.588-149.697z'
        />
        <path
          fill='#FFE94D'
          d='M357.2 0L0 614.809l357.2 225.29zm-52.675 196.753v547.82L71.234 597.434z'
        />
      </g>
    </svg>
  )
}

export default Logo
