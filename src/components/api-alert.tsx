import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CopyIcon, ServerIcon } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
	title: string
	description: string
	variant: 'public' | 'admin'
}

const textMap: Record<Props['variant'], string> = {
	public: 'public',
	admin: 'Admin'
}

const variantMap: Record<Props['variant'], BadgeProps['variant']> = {
	public: 'secondary',
	admin: 'destructive'
}

const ApiAlert = ({ description, title, variant = 'public' }: Props) => {
	const onCopy = (description: string) => {
		navigator.clipboard.writeText(description)
		toast.success('API route copied to the clipboard successfully!')
	}

	return (
		<Alert>
			<ServerIcon className='size-4' />
			<AlertTitle className='flex items-center gap-x-2'>
				{title}
				<Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
			</AlertTitle>
			<AlertDescription className='mt-4 flex items-center justify-between'>
				<code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
					{description}
				</code>
				<Button
					variant={'ghost'}
					size={'icon'}
					onClick={() => onCopy(description)}
				>
					<CopyIcon className='size-4' />
				</Button>
			</AlertDescription>
		</Alert>
	)
}

export default ApiAlert
