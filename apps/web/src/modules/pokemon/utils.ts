import { POKEMON_PREVIEW_IMAGE_PATH } from "@module/pokemon/config";
import { API_BASE_URL } from "@module/core/config/api";

export function getPokemonPreviewImage(slug: string) {
  return `${POKEMON_PREVIEW_IMAGE_PATH}/${slug}.jpg`;
}

export function getPokemonAudioLink(id: number | string) {
  return `${API_BASE_URL}/sound/${id}.mp3`;
}
