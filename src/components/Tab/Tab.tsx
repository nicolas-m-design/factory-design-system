import './Tab.css'
import { useId, useMemo, useRef } from 'react'
import { Icon, type IconName } from '../Icon/Icon'

interface TabItem {
  value: string
  label: string
  icon?: IconName
  count?: number
  disabled?: boolean
  content?: React.ReactNode
}

interface TabsProps {
  items: TabItem[]
  value: string
  onValueChange?: (value: string) => void
  ariaLabel?: string
  idBase?: string
}

export function Tabs({
  items,
  value,
  onValueChange,
  ariaLabel = 'Tabs',
  idBase,
}: TabsProps) {
  const generatedId = useId()
  const baseId = idBase ?? generatedId.replace(/:/g, '-')
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const enabledIndexes = useMemo(
    () => items.map((item, index) => (item.disabled ? null : index)).filter((index): index is number => index !== null),
    [items],
  )

  function selectByIndex(index: number) {
    const item = items[index]
    if (!item || item.disabled) {
      return
    }

    onValueChange?.(item.value)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    const enabledIndex = enabledIndexes.indexOf(currentIndex)
    if (enabledIndex === -1) {
      return
    }

    const move = (nextEnabledIndex: number) => {
      const nextIndex = enabledIndexes[nextEnabledIndex]
      itemRefs.current[nextIndex]?.focus()
      selectByIndex(nextIndex)
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      move((enabledIndex + 1) % enabledIndexes.length)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      move((enabledIndex - 1 + enabledIndexes.length) % enabledIndexes.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      move(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      move(enabledIndexes.length - 1)
    }
  }

  return (
    <div className="tabs">
      <div aria-label={ariaLabel} className="tabs__list" role="tablist">
        {items.map((item, index) => {
          const selected = item.value === value
          const tabId = `${baseId}-${item.value}-tab`
          const panelId = `${baseId}-${item.value}-panel`

          return (
            <button
              key={item.value}
              ref={node => {
                itemRefs.current[index] = node
              }}
              aria-controls={item.content ? panelId : undefined}
              aria-selected={selected}
              className={`tab tab--${selected ? 'active' : 'default'} ${item.disabled ? 'tab--disabled' : ''}`}
              disabled={item.disabled}
              id={tabId}
              onClick={() => selectByIndex(index)}
              onKeyDown={event => handleKeyDown(event, index)}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {item.icon && <Icon className="tab__icon" name={item.icon} size={20} />}
              <span>{item.label}</span>
              {item.count !== undefined && <span className="tab__count">{item.count}</span>}
            </button>
          )
        })}
      </div>
      {items.some(item => item.content) && (
        <div className="tabs__panels">
          {items.map(item => {
            const selected = item.value === value
            const tabId = `${baseId}-${item.value}-tab`
            const panelId = `${baseId}-${item.value}-panel`

            return (
              <section
                aria-labelledby={tabId}
                className="tabs__panel"
                hidden={!selected}
                id={panelId}
                key={item.value}
                role="tabpanel"
              >
                {item.content}
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
