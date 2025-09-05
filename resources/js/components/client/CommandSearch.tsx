import { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command';

export default function CommandSearch() {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleValueChange = (value: string) => {
        setInputValue(value);
        setOpen(!!value);
    };

    // const filteredData = Array.isArray(data) ? data.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase())) : [];

    return (
        <Command className="border shadow-md md:min-w-[450px]">
            <CommandInput placeholder="Search" onValueChange={handleValueChange} />

            {open && inputValue.length > 0 && (
                <CommandList className="absolute top-26 z-10 mt-1 rounded-md border bg-primary-foreground shadow-md md:min-w-[450px]">
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>Profile</CommandItem>
                        <CommandItem>Billing</CommandItem>
                        <CommandItem>Settings</CommandItem>
                    </CommandGroup>
                </CommandList>
            )}
        </Command>
    );
}
