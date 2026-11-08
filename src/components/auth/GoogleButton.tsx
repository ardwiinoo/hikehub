import google from '../../assets/brands/google.svg'

export function GoogleButton({ label }: { label: string }) {
  return (
    <>
      {/* TODO: hook up OAuth once the backend is ready. */}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-full border border-zinc-300 py-3 text-sm font-semibold transition hover:bg-zinc-50"
      >
        <img src={google} alt="" className="h-4 w-auto" />
        {label}
      </button>
      <div className="my-6 flex items-center gap-4 text-xs text-zinc-400">
        <span className="h-px flex-1 bg-zinc-200" />
        atau dengan email
        <span className="h-px flex-1 bg-zinc-200" />
      </div>
    </>
  )
}
