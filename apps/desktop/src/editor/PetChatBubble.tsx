import React, { useState } from 'react';
import { AdoptedPet } from '@petto/shared';
import { playPetSound } from '../audio/SoundFx';
import { MessageSquare, Send, Sparkles, Smile, Heart, Sun } from 'lucide-react';

interface PetChatBubbleProps {
  pet: AdoptedPet;
}

export default function PetChatBubble({ pet }: PetChatBubbleProps) {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'pet'; text: string }>>([
    { sender: 'pet', text: `Hi ${pet.ownerName}! I'm ${pet.name} 🐾 What shall we do today?` }
  ]);
  const [inputText, setInputText] = useState('');

  const petResponses = [
    `I love hanging out on your desktop! 💖`,
    `Did someone say treats?! 🍕`,
    `You are the best owner ever, ${pet.ownerName}! ⭐`,
    `I'm feeling extra ${pet.personality} today! ✨`,
    `Purr... life is great! 🐾`
  ];

  const handleSendMessage = (textToSend?: string) => {
    const msg = textToSend || inputText;
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: msg }]);
    if (!textToSend) setInputText('');

    playPetSound(pet.speciesName === 'Cat' ? 'meow' : 'woof');

    setTimeout(() => {
      const randomResponse = petResponses[Math.floor(Math.random() * petResponses.length)];
      setMessages((prev) => [...prev, { sender: 'pet', text: randomResponse }]);
    }, 600);
  };

  return (
    <div
      style={{
        background: 'rgba(30, 41, 59, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '24px',
        maxWidth: '440px',
        width: '100%',
        color: '#ffffff'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <MessageSquare size={20} color="#fff" />
        </div>
        <div>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Talk to {pet.name}</h4>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Interactive Companion Chat Bubble</span>
        </div>
      </div>

      {/* Chat Messages Box */}
      <div
        style={{
          height: '180px',
          overflowY: 'auto',
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '16px',
          padding: '14px',
          marginBottom: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
              background: m.sender === 'user' ? 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' : 'rgba(30, 41, 59, 0.9)',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
              fontSize: '0.85rem',
              maxWidth: '80%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {m.sender === 'pet' && <strong style={{ color: '#f472b6', display: 'block', fontSize: '0.72rem' }}>{pet.name}</strong>}
            {m.text}
          </div>
        ))}
      </div>

      {/* Quick Prompt Chips */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {['Give me a compliment! ✨', 'Tell me a joke! 😸', 'Want a treat? 🍕'].map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendMessage(prompt)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '9999px',
              color: '#cbd5e1',
              padding: '4px 10px',
              fontSize: '0.72rem',
              cursor: 'pointer'
            }}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        style={{ display: 'flex', gap: '8px' }}
      >
        <input
          type="text"
          placeholder={`Say something to ${pet.name}...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', borderRadius: '10px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '0.85rem' }}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
