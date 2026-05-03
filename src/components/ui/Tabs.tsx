import {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

type TabsContextValue = {
  baseId: string
  value: string
  setValue: (value: string) => void
}

type TabsProps = {
  children: ReactNode
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

type TabsListProps = HTMLAttributes<HTMLDivElement>

type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string
}

type TabsContentProps = ComponentPropsWithoutRef<'div'> & {
  value: string
}

const TabsContext = createContext<TabsContextValue | null>(null)

function cn(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(' ')
}

function useTabsContext() {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('Tabs components must be used within <Tabs>.')
  }

  return context
}

export function Tabs({
  children,
  defaultValue,
  value,
  onValueChange,
  className,
}: TabsProps) {
  const generatedId = useId()
  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const currentValue = value ?? internalValue

  const contextValue = useMemo(
    () => ({
      baseId: generatedId,
      value: currentValue,
      setValue: (nextValue: string) => {
        if (value === undefined) {
          setInternalValue(nextValue)
        }

        onValueChange?.(nextValue)
      },
    }),
    [currentValue, generatedId, onValueChange, value],
  )

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center rounded-full border border-[#D2DAE0] bg-[#F5F7F9] p-1',
        className,
      )}
      {...props}
    />
  )
}

export function TabsTrigger({
  className,
  value,
  children,
  onClick,
  ...props
}: TabsTriggerProps) {
  const context = useTabsContext()
  const isActive = context.value === value
  const triggerId = `${context.baseId}-trigger-${value}`
  const contentId = `${context.baseId}-content-${value}`

  return (
    <button
      type="button"
      role="tab"
      id={triggerId}
      aria-selected={isActive}
      aria-controls={contentId}
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(
        'inline-flex h-8 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-medium tracking-[-0.01em] transition',
        isActive
          ? 'bg-[#7890E7] text-white'
          : 'text-[#5F6E76] hover:bg-[#F5F7F9] hover:text-[#14212B]',
        className,
      )}
      onClick={(event) => {
        context.setValue(value)
        onClick?.(event)
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export function TabsContent({
  className,
  value,
  children,
  ...props
}: TabsContentProps) {
  const context = useTabsContext()
  const isActive = context.value === value
  const triggerId = `${context.baseId}-trigger-${value}`
  const contentId = `${context.baseId}-content-${value}`

  if (!isActive) {
    return null
  }

  return (
    <div
      role="tabpanel"
      id={contentId}
      aria-labelledby={triggerId}
      data-state={isActive ? 'active' : 'inactive'}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}
