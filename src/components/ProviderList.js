import React from 'react'

export default function ProviderList({foundProviders}) {
    
    return (
      <ul>
        {foundProviders.map((provider, index) => <li key={index}>{provider.name} {provider.location.city}</li>)}
      </ul>

    )
}
