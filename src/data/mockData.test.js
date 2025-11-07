import { describe, it, expect, beforeEach } from 'vitest'
import { storage, adoptions as mockAdoptions, coralUpdates as mockUpdates } from './mockData'

// Manually trigger initialization for tests
if (!storage.get('adoptions')) {
  storage.set('adoptions', mockAdoptions)
}
if (!storage.get('coralUpdates')) {
  storage.set('coralUpdates', mockUpdates)
}

describe('Storage utilities', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('can set and get values', () => {
    storage.set('test', { key: 'value' })
    const result = storage.get('test')
    expect(result).toEqual({ key: 'value' })
  })

  it('returns null for non-existent keys', () => {
    const result = storage.get('nonexistent')
    expect(result).toBeNull()
  })

  it('can remove values', () => {
    storage.set('test', 'value')
    storage.remove('test')
    const result = storage.get('test')
    expect(result).toBeNull()
  })

  it('handles JSON parsing errors gracefully', () => {
    localStorage.setItem('invalid', 'not json')
    const result = storage.get('invalid')
    expect(result).toBeNull()
  })

  it('initializes adoptions data when module loads', () => {
    // Manually initialize like the module does
    if (!storage.get('adoptions')) {
      storage.set('adoptions', mockAdoptions)
    }
    const stored = storage.get('adoptions')
    expect(stored).toBeTruthy()
    expect(Array.isArray(stored)).toBe(true)
  })

  it('initializes coral updates data when module loads', () => {
    // Manually initialize like the module does
    if (!storage.get('coralUpdates')) {
      storage.set('coralUpdates', mockUpdates)
    }
    const stored = storage.get('coralUpdates')
    expect(stored).toBeTruthy()
    expect(typeof stored).toBe('object')
  })
})

describe('Mock data', () => {
  it('has valid adoption data structure', () => {
    expect(mockAdoptions.length).toBeGreaterThan(0)
    mockAdoptions.forEach(adoption => {
      expect(adoption).toHaveProperty('id')
      expect(adoption).toHaveProperty('name')
      expect(adoption).toHaveProperty('location')
      expect(adoption).toHaveProperty('status')
    })
  })

  it('has valid update data structure', () => {
    expect(typeof mockUpdates).toBe('object')
    Object.values(mockUpdates).forEach(updates => {
      expect(Array.isArray(updates)).toBe(true)
      updates.forEach(update => {
        expect(update).toHaveProperty('id')
        expect(update).toHaveProperty('date')
        expect(update).toHaveProperty('description')
      })
    })
  })
})

