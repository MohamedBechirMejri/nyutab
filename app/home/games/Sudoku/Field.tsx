import Picker from './Picker'

const Field = ({
  i,
  initialPuzzle,
  field,
  setPuzzle,
  errorsIndexes,
  setErrorsIndexes,
}: {
  i: number
  initialPuzzle: any
  field: number
  setPuzzle: any
  errorsIndexes: number[]
  setErrorsIndexes: any
}) => {
  const showTopBorder = (i >= 54 && i <= 62) || (i >= 27 && i <= 35)
  const showBottomBorder = (i >= 45 && i <= 53) || (i >= 18 && i <= 26)
  const showRightBorder = !((i + 7) % 9) || !((i + 4) % 9)
  const showLeftBorder = !((i + 6) % 9) || !((i + 3) % 9)

  return (
    <div
      className={`relative flex items-center justify-center border group  bg-linear-to-br ${
        errorsIndexes.includes(i)
          ? 'from-red-200 to-red-200 text-red-500'
          : initialPuzzle![i] === null
            ? 'from-white to-gray-200'
            : 'from-gray-300 to-gray-200'
      } `}
      style={{
        borderTopColor: showTopBorder ? '#999' : '#ccc',
        borderBottomColor: showBottomBorder ? '#999' : '#ccc',
        borderRightColor: showRightBorder ? '#999' : '#ccc',
        borderLeftColor: showLeftBorder ? '#999' : '#ccc',
        borderTopLeftRadius: i === 0 ? '1rem' : 0,
        borderTopRightRadius: i === 8 ? '1rem' : 0,
        borderBottomLeftRadius: i === 72 ? '1rem' : 0,
        borderBottomRightRadius: i === 80 ? '1rem' : 0,
      }}
    >
      <p>{field !== null && field + 1}</p>

      {initialPuzzle![i] === null ? (
        <Picker field={field} i={i} setPuzzle={setPuzzle} setErrorsIndexes={setErrorsIndexes} />
      ) : null}
    </div>
  )
}

export default Field
