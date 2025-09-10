import React from 'react'
import { Button } from '@/components/ui/button';
import { useState } from 'react';

function randomizer(length: number = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }
    return result;
}
function Settings() {
    const [saveRandomizer, setRandomizer] = useState('');
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
            Subject Code: {saveRandomizer} <br />
      <Button onClick={() => setRandomizer(randomizer())} className="cursor-pointer">Generate Code</Button>
    </div> 
  )
}

export default Settings 