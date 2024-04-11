'use client'
import { chainList } from '@/constants/chain'
import { useProvider } from '@/hooks/useProvider'
import { Option as BaseOption, optionClasses } from '@mui/base/Option'
import {
  Select as BaseSelect,
  SelectProps,
  SelectRootSlotProps,
  selectClasses
} from '@mui/base/Select'
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded'
import { styled } from '@mui/system'
import * as React from 'react'

type SelectNetworkProps = {
  currentChainId: string
}
export default function SelectNetwork({ currentChainId }: SelectNetworkProps) {
  const [value, setValue] = React.useState<string | null>(currentChainId)
  const mask = useProvider()

  const handleChangeNetwork = async (chainId: string) => {
    console.log('chainId', chainId)

    if (currentChainId === chainId) return

    await mask?.changeNetwork(chainId)
  }
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Select
        value={value}
        defaultValue={currentChainId}
        onChange={(_, newValue) => {
          setValue(newValue)
          handleChangeNetwork(newValue || '')
        }}
      >
        {chainList.map(item => (
          <Option key={item.chainId} value={item.chainId}>
            {item.name}
          </Option>
        ))}
      </Select>
    </div>
  )
}

function Select(props: SelectProps<string, false>) {
  const slots: SelectProps<string, false>['slots'] = {
    root: StyledButton,
    listbox: Listbox,
    popup: Popup,
    ...props.slots
  }

  return <BaseSelect {...props} slots={slots} />
}

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75'
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025'
}

const CustomButton = React.forwardRef(function CustomButton(
  props: SelectRootSlotProps<number, false>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props
  return (
    <button
      type='button'
      {...other}
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <span>{other.children}</span>
      <UnfoldMoreRoundedIcon />
    </button>
  )
})

const StyledButton = styled(CustomButton, { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 320px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  & > svg {
    font-size: 1rem;
    vertical-align: middle;
  }
  `
)

const Listbox = styled('ul')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 2px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
  };
  `
)

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `
)

const Popup = styled('div')`
  z-index: 1;
`

const Paragraph = styled('p')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  margin: 10px 0;
  color: ${theme.palette.mode === 'dark' ? grey[400] : grey[700]};
  `
)
