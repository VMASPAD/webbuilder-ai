import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import getEditorInstance from "../grapesjs";

const FontManagement = () => {
  const [fonts, setFonts] = useState([]);
  const [newFontUrl, setNewFontUrl] = useState('');

  useEffect(() => {
    const storedFonts = JSON.parse(localStorage.getItem('fonts')) || [];
    setFonts(storedFonts);
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

  const toggleFont = (index) => {
    const updatedFonts = fonts.map((font, i) => 
      i === index ? { ...font, active: !font.active } : font
    );
    setFonts(updatedFonts);
    localStorage.setItem('fonts', JSON.stringify(updatedFonts));
    updateGrapesJSFonts(updatedFonts);
  };

  const extractFontName = (url) => {
    const familyMatch = url.match(/family=([^:&]+)/);
    return familyMatch ? familyMatch[1].replace(/\+/g, ' ') : 'Unknown Font';
  };

  const updateGrapesJSFonts = (updatedFonts) => {
    const editor = getEditorInstance();
    if (editor) {
      const activeFonts = updatedFonts.filter(font => font.active);
      
      // Update font options in GrapesJS
      const fontOptions = activeFonts.map(font => ({
        value: `"${font.name}", sans-serif`,
        name: font.name
      }));

      editor.StyleManager.getProperty('typography', 'font-family').set('options', fontOptions);

      // Add font styles to the editor
      const fontStyles = activeFonts.map(font => 
        `@import url('${font.url}');`
      ).join('\n');

      editor.Canvas.getDocument().head.innerHTML += `<style>${fontStyles}</style>`;
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