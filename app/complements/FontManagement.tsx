import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import getEditorInstance from "../grapesjs";

type Font = {
  url: string;
  name: string;
  active: boolean;
};

const FontManagement = () => {
  const [fonts, setFonts] = useState<Font[]>([]);
  const [newFontUrl, setNewFontUrl] = useState('');

  useEffect(() => {
    const storedFonts = localStorage.getItem('fonts');
    const parsedFonts = storedFonts ? JSON.parse(storedFonts) : [];
    setFonts(parsedFonts);
    updateGrapesJSFonts(parsedFonts);
  }, []);

  const addFont = () => {
    if (!newFontUrl) return;

    const fontName = extractFontName(newFontUrl);
    const newFont = { url: newFontUrl, name: fontName, active: true };
    const updatedFonts = [...fonts, newFont];
    setFonts(updatedFonts);
    localStorage.setItem('fonts', JSON.stringify(updatedFonts));
    setNewFontUrl('');
    updateGrapesJSFonts(updatedFonts);
  };

  const toggleFont = (index: number) => {
    const updatedFonts = fonts.map((font, i) =>
      i === index ? { ...font, active: !font.active } : font
    );
    setFonts(updatedFonts);
    localStorage.setItem('fonts', JSON.stringify(updatedFonts));
    updateGrapesJSFonts(updatedFonts);
  };

  const extractFontName = (url: string) => {
    const familyMatch = url.match(/family=([^:&]+)/);
    return familyMatch ? familyMatch[1].replace(/\+/g, ' ') : 'Unknown Font';
  };

  const updateGrapesJSFonts = (updatedFonts: Font[]) => {
    const editor = getEditorInstance();
    if (editor) {
      const canvas = editor.Canvas;
      const head = canvas.getDocument().head;
      
      // Remove existing font style tags
      const existingStyleTags = head.querySelectorAll('style[data-font-styles]');
      existingStyleTags.forEach(tag => tag.remove());

      // Add new style tag with active fonts
      const activeFonts = updatedFonts.filter(font => font.active);
      const fontStyles = activeFonts.map(font =>
        `@import url('${font.url}');`
      ).join('\n');

      if (fontStyles) {
        const styleTag = canvas.getDocument().createElement('style');
        styleTag.setAttribute('data-font-styles', '');
        styleTag.textContent = fontStyles;
        head.appendChild(styleTag);
      }

      // Trigger a canvas update
      editor.refresh();
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Enter Google Fonts URL"
          value={newFontUrl}
          onChange={(e) => setNewFontUrl(e.target.value)}
        />
        <Button onClick={addFont} className="mt-2">Add Font</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Font Name</TableHead>
            <TableHead>Active</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fonts.map((font, index) => (
            <TableRow key={index}>
              <TableCell>{font.name}</TableCell>
              <TableCell>
                <Checkbox
                  checked={font.active}
                  onCheckedChange={() => toggleFont(index)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FontManagement;
