import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { TbArrowNarrowDown } from 'react-icons/tb'

export default function Select({
  options,
  selected = '',
  setSelected,
  label = '',
  placeholder = 'Search...',
  onCreate = () => {},
  noCreate = false,
  canClear = false,
}: {
  options: { id: string; name: string }[]
  selected: string | null
  setSelected: (arg0: string) => void
  label?: string
  placeholder?: string
  onCreate?: (arg0: string) => void
  noCreate?: boolean
  canClear?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState('')

  const handleSelect = (option: { id: string; name: string }) => {
    setSelected(option.id)
    setIsFocused(false)
    setSearch('')
  }

  return (
    <motion.div
      className="relative grid max-w-xl grid-rows-[.75fr,1fr] rounded-md shadow-sm"
      initial={{ border: '1px solid #303030' }}
      animate={{
        border: isFocused ? '1px solid #6d28d9' : '1px solid #303030',
      }}
      transition={{ duration: 0.1 }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <motion.div className="flex w-full flex-wrap items-center justify-between gap-2 p-3 pb-0 pr-4">
        <label className="text-xs font-bold">{label}</label>
        <TbArrowNarrowDown />
      </motion.div>

      <motion.input
        className="relative z-10 h-full w-full border-none bg-transparent px-3 text-gray-400 outline-none"
        type="search"
        placeholder={options.find(x => x.id === selected)?.name || placeholder}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <AnimatePresence>
        {isFocused && (
          <motion.ul
            className="absolute left-0 top-full z-20 max-h-64 w-full overflow-y-scroll rounded-md border border-violet-900 bg-violet-500 shadow-md"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 15 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {canClear && (
              <motion.li
                key={'deselect'}
                className="relative flex w-full cursor-pointer items-center justify-between px-4 py-2 text-sm font-semibold text-gray-500"
                initial={{ backgroundColor: '#222' }}
                whileHover={{ backgroundColor: '#333' }}
                whileTap={{ backgroundColor: '#444' }}
                transition={{ duration: 0.1 }}
                onClick={() => handleSelect({ id: '', name: '' })}
              >
                -- Clear --
              </motion.li>
            )}

            {options.map(option =>
              option.name && option.name.toLowerCase().includes(search.toLowerCase()) ? (
                <motion.li
                  key={option.id}
                  className="relative flex w-full cursor-pointer items-center justify-between px-4 py-2 text-sm font-semibold"
                  initial={{ backgroundColor: '#222' }}
                  whileHover={{ backgroundColor: '#333' }}
                  whileTap={{ backgroundColor: '#444' }}
                  transition={{ duration: 0.1 }}
                  onClick={() => handleSelect(option)}
                >
                  {option.name}
                </motion.li>
              ) : null
            )}
            {!noCreate && search && !options.map(o => o.name).includes(search) && (
              <button
                className="flex w-full items-center justify-center p-2"
                onClick={() => {
                  onCreate(search)
                  setSearch('')
                }}
              >
                Create "{search}"
              </button>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
